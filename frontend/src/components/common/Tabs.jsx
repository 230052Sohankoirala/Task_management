import clsx from "clsx";

export function Tabs({ tabs, active, onChange }) {
  return (
    <div className="tabs">
      {tabs.map((tab) => (
        <button key={tab} className={clsx(active === tab && "active")} onClick={() => onChange(tab)}>{tab}</button>
      ))}
    </div>
  );
}
