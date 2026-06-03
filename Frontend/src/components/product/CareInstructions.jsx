import { Leaf } from 'lucide-react';

export default function CareInstructions({ instructions = [] }) {
  return (
    <ul className="space-y-3">
      {instructions.map((instruction, idx) => (
        <li key={idx} className="flex items-start gap-3">
          <Leaf size={16} className="text-primary mt-0.5 flex-shrink-0" />
          <span className="text-sm text-text-muted">{instruction}</span>
        </li>
      ))}
      <li className="flex items-start gap-3">
        <Leaf size={16} className="text-primary mt-0.5 flex-shrink-0" />
        <span className="text-sm text-text-muted">Handle with care — each piece is handmade and unique</span>
      </li>
    </ul>
  );
}
