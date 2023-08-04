import Link from "next/link";
import supabase from "@/config/supabaseClient";

interface SmoothieCardProps {
  smoothie: {
    id: number;
    title: string;
    method: string;
    rating: number;
  };
  onDelete: (id: number) => void;
}

const SmoothieCard: React.FC<SmoothieCardProps> = ({ smoothie, onDelete }) => {
  const handleDelete = async () => {
    const { data, error } = await supabase
      .from("smoothies")
      .delete()
      .eq("id", smoothie.id)
      .select();

    if (error) {
      console.log(error);
    }

    if (data) {
      console.log(data);
      onDelete(smoothie.id);
    }
  };

  return (
    <div className="smoothie-card">
      <h3 className="text-lg font-bold">{smoothie.title}</h3>
      <p>{smoothie.method}</p>
      <div className="rating">{smoothie.rating}</div>
      <div className="buttons">
        <Link href={`/${smoothie.id}`}>
          <i className="material-icons">edit</i>
        </Link>
        <i className="material-icons" onClick={handleDelete}>
          delete
        </i>
      </div>
    </div>
  );
};

export default SmoothieCard;
