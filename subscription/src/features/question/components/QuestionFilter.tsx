import { useNavigate } from "react-router-dom";
import { useState } from "react";
import SearchField from "../../../components/ui/SearchField";
import CheckBoxField from "../../../components/ui/CheckBoxField";

/** Functional props. */
interface QuestionFilterProps {
    title: string;
    onSearchTextChange: (text: string) => void;
    onSearchDateChange: (date: string) => void;
    onShowHiddenChange: (show: boolean) => void;
    onShowUnansweredChange: (show: boolean) => void;
    onClearFiltersChange: () => void;
}

/** Filter questions based on title, tags, and date. */
export default function QuestionFilter(props: QuestionFilterProps) {
    const [showHidden, setShowHidden] = useState(false);
    const [showUnanswered, setShowUnanswered] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [searchDate, setSearchDate] = useState("");

    const navigate = useNavigate();

    /** Handles search string change. */
    const handleSearchStringChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setSearchText(val);
        props.onSearchTextChange(val);
    };

    const handleSearchDateChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setSearchDate(val);
        props.onSearchDateChange(val);
    };

    /** Handles toggle for showing hidden questions. */
    const handleHiddenChanged = () => {
        setShowHidden(!showHidden);
        props.onShowHiddenChange(!showHidden);
    };

    /** Handles toogle for showing unanswered questions. */
    const handleUnansweredChanged = () => {
        setShowUnanswered(!showUnanswered);
        props.onShowUnansweredChange(!showUnanswered);
    };

    const handleClear = () => {
        setSearchText("");
        setSearchDate("");
        setShowHidden(false);
        setShowUnanswered(false);
        props.onClearFiltersChange();
    };

    return (
        <div className="mb-3 card shadow rounded-4 border-0">
            <div className="card-body">
                <form id="filterForm" className="">
                    <h2>{props.title}</h2>
                    <div className="row my-3 g-2">
                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12">
                            <SearchField id="searchText" icon="search" value={searchText} onChange={handleSearchStringChanged} title="Search by title or tag" type="text" placeHolder="Search by title or tag..." />
                        </div>
                        <div className="col-xl-3 col-lg-3 col-md-4 col-sm-12">
                            <SearchField id="dateSearch" icon="calendar" value={searchDate} onChange={handleSearchDateChanged} title="Search by date" type="date" />
                        </div>
                        <div className="col-xl-3 col-lg-3 col-md-4 col-sm-12 col-12 d-flex align-items-center">
                            <CheckBoxField id="hidden" label="Hidden" className="ms-1 me-3" value={String(showHidden)} onChange={handleHiddenChanged} />
                            <CheckBoxField id="unanswered" label="Unanswered" value={String(showUnanswered)} onChange={handleUnansweredChanged} />
                        </div>
                        <div className="col-xl-2 col-lg-2 col-md-12 col-sm-12 col-12 d-flex justify-content-end align-items-center">
                            <button className="btn btn-sm btn-danger me-2" type="reset" onClick={handleClear}>
                                <i className="bi bi-funnel"> Clear</i>
                            </button>
                            <button
                                className="btn btn-sm btn-success"
                                onClick={(e) => {
                                    e.preventDefault();
                                    navigate("/post");
                                }}
                            >
                                <i className="bi bi-plus-circle"> New</i>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
