export default function Page({ params }: { params: { id: any } }) {
    return <div>My Post: {params.id}</div>
  }