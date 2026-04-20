type Props = {
  name: string;
};

export default function MealCard({ name }: Props) {
  return (
    <div
      style={{
        padding: '20px',
        borderRadius: '12px',
        background: '#fff',
        boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '20px',
      }}
    >
      {name}
    </div>
  );
}
