import { Link, useSearchParams } from "react-router-dom";
import Search from "./Search";

const SideMenu = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleFilterChange = (e) => {
    if (searchParams.get("sort") !== e.target.value) {
      setSearchParams({
        ...Object.fromEntries(searchParams.entries()),
        sort: e.target.value,
      });
    }
  };

  const handleCategoryChange = (category) => {
    if (searchParams.get("cat") !== category) {
      setSearchParams({
        ...Object.fromEntries(searchParams.entries()),
        cat:category,
      });
    }
  };
  
  return (
    <div className="px-4 h-max sticky top-8">
      <h1 className="mb-4 text-sm font-medium">Search</h1>
      <Search />
      <h1 className="mt-8 mb-4 text-sm font-medium">Filter</h1>
      <div className="flex flex-col gap-2 text-sm">
        <label htmlFor="" className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="sort"
            onChange={handleFilterChange}
            value="newest"
            className="appearance-none w-4 h-4 border-[1.5px] border-blue-800 cursor-pointer rounded-sm checked:bg-blue-800 checked:border-transparent bg-white"
          />
          Newest
        </label>
        <label htmlFor="" className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="sort"
            onChange={handleFilterChange}
            value="popular"
            className="appearance-none w-4 h-4 border-[1.5px] border-blue-800 cursor-pointer rounded-sm checked:bg-blue-800 checked:border-transparent bg-white"
          />
          Most Popular
        </label>
        <label htmlFor="" className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="sort"
            onChange={handleFilterChange}
            value="trending"
            className="appearance-none w-4 h-4 border-[1.5px] border-blue-800 cursor-pointer rounded-sm checked:bg-blue-800 checked:border-transparent bg-white"
          />
          Trending
        </label>
        <label htmlFor="" className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="sort"
            onChange={handleFilterChange}
            value="oldest"
            className="appearance-none w-4 h-4 border-[1.5px] border-blue-800 cursor-pointer rounded-sm checked:bg-blue-800 checked:border-transparent bg-white"
          />
          Oldest
        </label>
      </div>
      <h1 className="mt-8 mb-4 text-sm font-medium">Categories</h1>
      <div className="flex flex-col gap-2 text-sm">
        {/* <Link to="/posts" className="underline">
          All
        </Link>
        <Link to="/posts?cat=web-design" className="underline">
          Web Design
        </Link>
        <Link to="/posts?cat=development" className="underline">
          Development
        </Link>
        <Link to="/posts?cat=databases" className="underline">
          Databases
        </Link>
        <Link to="/posts?cat=seo" className="underline">
          Search Engines
        </Link>
        <Link to="/posts?cat=marketing" className="underline">
          Marketing
        </Link> */}
        <span className="underline cursor-pointer" onClick={()=>handleCategoryChange("general")}>All</span>
        <span className="underline cursor-pointer" onClick={()=>handleCategoryChange("web-design")}>Web Design</span>
        <span className="underline cursor-pointer" onClick={()=>handleCategoryChange("development")}>Development</span>
        <span className="underline cursor-pointer" onClick={()=>handleCategoryChange("databases")}>Databases</span>
        <span className="underline cursor-pointer" onClick={()=>handleCategoryChange("seo")}>Search Engines</span>
        <span className="underline cursor-pointer" onClick={()=>handleCategoryChange("marketing")}>Marketing</span>
      </div>
    </div>
  );
};

export default SideMenu;
