import { useLoss } from "./useLoss";

const LossList = () => {
  const { lossList } = useLoss();

  return (
    <div>
      {lossList.map((pet, idx) => (
        <div key={idx}>{pet.age}</div>
      ))}
    </div>
  );
};

export default LossList;
