'use client'; // Add 'use client' since you're using hooks in a client-side component
import { useSearchParams } from 'next/navigation';
import ManagePostProperties from "../../../../components/ManagePostProperties";

export default function PostDetailsPage() {
  const searchParams = useSearchParams();
  const type = searchParams.get('type');
  const id = searchParams.get('id');

  return (
    <div className="pt-2 p-1">
      <ManagePostProperties type={type} id={id} />
    </div>
  );
}
