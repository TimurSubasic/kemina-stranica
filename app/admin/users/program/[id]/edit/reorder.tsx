"use client";

import React, { useEffect, useState } from "react";
import { ProgramExerciseProps } from "./day-week-selector";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import { toast } from "sonner";
import { reorderExercises } from "./actions";
import { useRouter } from "next/navigation";

export default function Reorder({
  exercises,
}: {
  exercises: ProgramExerciseProps[];
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  // Local reorder state
  const [localExercises, setLocalExercises] = useState(exercises);
  useEffect(() => {
    if (open) {
      setLocalExercises(exercises);
    }
  }, [open]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = localExercises.findIndex((ex) => ex.id === active.id);
    const newIndex = localExercises.findIndex((ex) => ex.id === over.id);

    const newOrder = arrayMove(localExercises, oldIndex, newIndex).map(
      (ex, idx) => ({
        ...ex,
        order: idx + 1,
      })
    );

    setLocalExercises(newOrder);
  };

  const handleSave = async () => {
    setOpen(false);
    toast.loading("Saving order...");
    const res = await reorderExercises(localExercises);
    toast.dismiss();
    if (res.success) {
      toast.success("New order saved");
    } else toast.error("Error saving order");
    router.refresh();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="flex-1">
        <Button variant="outline" className="w-full" size="lg">
          Reorder
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogTitle className="text-center mb-3">
          Drag and drop to reorder
        </DialogTitle>

        <div className="w-full my-5">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={localExercises.map((ex) => ex.id)}
              strategy={verticalListSortingStrategy}
            >
              <ul className="flex flex-col gap-2">
                {localExercises.map((ex, idx) => (
                  <SortableItem
                    key={ex.id}
                    id={ex.id}
                    index={idx}
                    name={ex.exercise.name}
                  />
                ))}
              </ul>
            </SortableContext>
          </DndContext>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="destructive">Cancel</Button>
          </DialogClose>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function SortableItem({
  id,
  index,
  name,
}: {
  id: string;
  index: number;
  name: string;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="w-full text-lg rounded border bg-secondary border-primary p-4 flex justify-between items-center gap-5"
    >
      <div className="flex gap-4 items-center">
        <div
          {...listeners}
          className="cursor-grab active:cursor-grabbing p-2 rounded hover:bg-primary/10"
        >
          <GripVertical className="text-primary size-6" />
        </div>
        <div>
          {index + 1}: <i>{name}</i>
        </div>
      </div>
    </li>
  );
}
