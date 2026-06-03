export default function SizeGuide({ sizes = [] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 px-4 font-semibold text-text-dark">Size</th>
            <th className="text-left py-3 px-4 font-semibold text-text-dark">Diameter</th>
            <th className="text-left py-3 px-4 font-semibold text-text-dark">Approx. cm</th>
            <th className="text-right py-3 px-4 font-semibold text-text-dark">Price</th>
          </tr>
        </thead>
        <tbody>
          {sizes.map((size) => {
            const inches = parseFloat(size.diameter) || 0;
            const cm = (inches * 2.54).toFixed(1);
            return (
              <tr key={size.label} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4 font-medium text-text-dark">{size.label}</td>
                <td className="py-3 px-4 text-text-muted">{size.diameter}</td>
                <td className="py-3 px-4 text-text-muted">{cm} cm</td>
                <td className="py-3 px-4 text-right font-semibold text-primary">₹{size.price.toLocaleString('en-IN')}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
