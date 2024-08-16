import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/app/firebase/config';
interface LocationDetail {
  label: string;
  value: string;
}

interface Farmer {
  id: string;
  country: string;
  firstName: string;
  secondName: string;
  locationDetails: LocationDetail[];
  role: string;
}

const fetchFarmers = async (): Promise<Farmer[]> => {
  const q = query(collection(db, "users"), where("role", "==", "seller"));
  const querySnapshot = await getDocs(q);
  const farmersList = querySnapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      country: data.country,
      firstName: data.firstName,
      secondName: data.secondName,
      locationDetails: data.locationDetails,
      role: data.role,
    } as Farmer;
  });
  return farmersList;
};

const Farmers = async () => {
  const farmers = await fetchFarmers();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Farmers</h1>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            {/* <th className="py-2 px-4 border-b">ID</th> */}
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Location</th>
            <th className="py-2 px-4 border-b">Role</th>
          </tr>
        </thead>
        <tbody>
          {farmers.map((farmer) => (
            <tr key={farmer.id}>
              {/* <td className="py-2 px-4 border-b">{farmer.id}</td> */}
              <td className="py-2 px-4 border-b">{`${farmer.firstName} ${farmer.secondName}`}</td>
              <td className="py-2 px-4 border-b">
                {farmer.locationDetails.map(detail => (
                  <div key={detail.label}>{`${detail.label}: ${detail.value}`}</div>
                ))}
              </td>
              <td className="py-2 px-4 border-b">{farmer.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Farmers;
