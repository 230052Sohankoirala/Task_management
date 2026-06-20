import { Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const colors = ["#2563eb", "#7c3aed", "#059669", "#f59e0b", "#dc2626"];

export function StatusPie({ tasks }) {
  const data = Object.entries(tasks.reduce((acc, task) => ({ ...acc, [task.status]: (acc[task.status] || 0) + 1 }), {})).map(([name, value]) => ({ name, value }));
  return <ResponsiveContainer height={240}><PieChart><Pie data={data} dataKey="value" nameKey="name" outerRadius={82}>{data.map((entry, index) => <Cell key={entry.name} fill={colors[index % colors.length]} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer>;
}

export function PriorityBar({ tasks }) {
  const data = Object.entries(tasks.reduce((acc, task) => ({ ...acc, [task.priority]: (acc[task.priority] || 0) + 1 }), {})).map(([name, value]) => ({ name, value }));
  return <ResponsiveContainer height={240}><BarChart data={data}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" /><YAxis /><Tooltip /><Bar dataKey="value" fill="#2563eb" radius={[6, 6, 0, 0]} /></BarChart></ResponsiveContainer>;
}

export function ProgressLine() {
  const data = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((name, index) => ({ name, progress: 35 + index * 9 }));
  return <ResponsiveContainer height={240}><LineChart data={data}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" /><YAxis /><Tooltip /><Line type="monotone" dataKey="progress" stroke="#7c3aed" strokeWidth={3} /></LineChart></ResponsiveContainer>;
}
