import { useRef, useEffect } from "react";

function SearchTerms({ getTerm, setSelectState, selectState, terms }) {
  const containerRef = useRef(null);

  function setSelectFunc(val) {
    setSelectState(val);
  }

  const filteredTerms = terms.filter((term) =>
    term.name.toLowerCase().includes(getTerm.toLowerCase()),
  );

  const displayTerms =
    filteredTerms.length > 0
      ? filteredTerms
      : [{ ...terms[0], name: "Search Google", isFallback: true }];

  useEffect(() => {
    if (containerRef.current && selectState !== -1) {
      const selectedElement = containerRef.current.children[selectState];

      if (selectedElement) {
        selectedElement.scrollIntoView({
          behavior: "smooth", // Makes it slide rather than jump
          block: "nearest", // Prevents the whole page from jumping
        });
      }
    }
  }, [selectState, displayTerms]); // Re-run when selection OR the list changes
  return (
    <div
      className="flex flex-col w-full h-full border overflow-y-scroll select-none gap-2 bg-containerBg rounded-[7px] p-2"
      ref={containerRef}
    >
      {displayTerms.map((term, ind) => (
        <TermButton
          key={term.name}
          term={term}
          isSelected={ind == selectState}
          onSelect={() => setSelectFunc(ind)}
        />
      ))}
    </div>
  );
}

function TermButton({ term, ind, onSelect, isSelected }) {
  function handleClick() {
    if (term.name === "Search Google") {
      const isDomain = /^([a-z0-9|-]+\.)+[a-z]{2,}(\/.*)?$/i.test(myTerm);

      if (isDomain) {
        window.open(`https://${myTerm}`, "_blank");
      } else {
        window.open(
          `https://www.google.com/search?q=${encodeURIComponent(myTerm)}`,
          "_blank",
        );
      }
    } else {
      window.open(term.link, "_blank");
    }
    term.count = term.count + 1;
  }

  return (
    <button
      onMouseEnter={onSelect}
      onClick={handleClick}
      className={`flex text-[1rem]  justify-between items-center p-1.75 rounded-[5px] ${isSelected ? "bg-mainWhite  text-black" : "bg-transparent text-mainWhite"} `}
    >
      <div className="flex gap-2 items-center h-10 ">
        <div className="h-7 w-7 rounded-full overflow-hidden">
          <img
            src={term.logo}
            alt={term.name + "logo"}
            className="h-full w-full object-cover scale-105 bg-mainWhite"
          />{" "}
        </div>
        <div>{term.name}</div>
      </div>
      <div className="">{term.count}</div>
    </button>
  );
}

export default SearchTerms;
