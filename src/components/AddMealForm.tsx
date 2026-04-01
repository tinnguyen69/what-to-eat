import { useState } from "react";

type Props = {
  onAdd: (meal: { id: number; name: string }) => void;
};

export default function AddMealForm({ onAdd }: Props) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);

    try {
      const res = await fetch(
        "https://pp2omnr7fyryna5yokoxt2wori0zrbpk.lambda-url.ap-southeast-1.on.aws",
        {
          method: "POST",
          headers: { "x-api-key": "abc..." },
          body: JSON.stringify({ name }),
        },
      );

      if (!res.ok) {
        alert("Failed to add meal");
        return;
      }

      const newMeal = await res.json();

      onAdd(newMeal); // update UI immediately
      setName("");
    } catch (err) {
      console.error(err);
      alert("Error adding meal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Thêm món ở đây nè..."
        style={{
          padding: "10px",
          fontSize: "14px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          marginRight: "10px",
        }}
      />

      <button
        type="submit"
        disabled={loading}
        style={{
          padding: "10px 16px",
          borderRadius: "8px",
          border: "none",
          background: "#28a745",
          color: "white",
          cursor: "pointer",
        }}
      >
        {loading ? "Đang thêm..." : "Thêm hoy"}
      </button>
    </form>
  );
}
