import { PRIORITIES, TASK_TYPES } from "../../utils/constants";
import { SearchInput } from "../common/SearchInput";
import { Select } from "../common/Form";

export function TaskFilters({ search, setSearch, priority, setPriority, type, setType }) {
  return (
    <div className="filters">
      <SearchInput value={search} onChange={setSearch} placeholder="Search tasks" />
      <Select value={priority} onChange={(event) => setPriority(event.target.value)}>
        <option value="">All priorities</option>
        {PRIORITIES.map((item) => <option key={item}>{item}</option>)}
      </Select>
      <Select value={type} onChange={(event) => setType(event.target.value)}>
        <option value="">All types</option>
        {TASK_TYPES.map((item) => <option key={item}>{item}</option>)}
      </Select>
    </div>
  );
}
