import { SkillBoxItem } from "../../../types";

interface SkillBoxProps {
  title: string;
  description: string;
  items: SkillBoxItem[];
}

export const SkillBox: React.FC<SkillBoxProps> = ({
  title,
  description,
  items,
}) => {
  console.log(items);
  return (
    <div className="border rounded-lg p-4">
      <h3 className="flex items-center text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm mb-2">{description}</p>
      <div className="flex justify-between">
        <div>
          {items.map((item, index) => (
            <p key={index} className="text-sm font-semibold">
              {item.name || ""}
            </p>
          ))}
        </div>
        <div>
          {items.map((item, index) => (
            <p key={index} className="text-sm">
              {item.years ? `${item.years}年` : "一年未満"}
            </p>
          ))}
        </div>
        <div>
          {items.map((item, index) => (
            <p key={index} className="text-sm">
              {typeof item.stars === "number" && !isNaN(item.stars) ? (
                Array.from({ length: item.stars }).map((_, i) => (
                  <span key={i} style={{ color: "#ffc107" }}>
                    ★
                  </span>
                ))
              ) : (
                <span style={{ color: "#ffc107" }}>★</span>
              )}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};
