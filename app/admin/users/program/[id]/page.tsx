import { redirect } from "next/navigation";

export default async function HandleProgram({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const userId = (await params).id;

  //!! check if user has a plan or not and render create or edit
  if (true) {
    redirect(`/admin/users/program/${userId}/create`);
  } else {
    redirect(`/admin/users/program/${userId}/edit`);
  }
}
