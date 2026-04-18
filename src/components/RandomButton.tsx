type Props = {
  onClick: () => void;
};

export default function RandomButton({ onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        padding: '12px 20px',
        fontSize: '16px',
        borderRadius: '8px',
        border: 'none',
        background: '#007BFF',
        color: 'white',
        cursor: 'pointer',
      }}
    >
      Pick Again 🎲
    </button>
  );
}
