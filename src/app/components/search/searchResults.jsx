export const SearchResult = ({result}) => {
    return (
        <div
            className="bg-slate-100 pr-40 pl-6 hover:bg-slate-200 p-4 dark:text-black cursor-pointer"
            onClick={(e) => alert(`You selected ${result}!`)}
        >
            {result}
        </div>
    );
};
