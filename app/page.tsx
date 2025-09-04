import { redirect } from 'next/navigation';

//Not using this route: '/', just redirect to Dashboard if user navigates to this 

export default function Home() {
  redirect('/new-waiver');
}