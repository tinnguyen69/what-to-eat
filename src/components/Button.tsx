type Props = {
  title: string;
  onClick: () => void;
};

export default function Button({ title, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "12px 20px",
        fontSize: "16px",
        borderRadius: "8px",
        border: "none",
        background: "#007BFF",
        color: "white",
        cursor: "pointer",
      }}
    >
      {title}
    </button>
  );
}
