import { useEffect, useState } from "react";
import type { QuestionModel } from "../types/question.model";
import { useAuth } from "../../../hooks/useAuth";
import { getQuestions, updateQuestion } from "../services/questionService";
import { mapQuestionToQuestionUpdate } from "../../../utils/questionMapper";
import QuestionFilter from "../components/QuestionFilter";
import QuestionCard from "../components/QuestionCard";
import { useLoading } from "../../../hooks/useLoading";

/** Routable component which shows all questions to the user. */
export default function QuestionsPage() {
    const [questions, setQuestions] = useState<QuestionModel[]>([]);
    const [filteredQuestions, setFilteredQuestions] = useState<QuestionModel[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchDate, setSearchDate] = useState("");
    const [showHidden, setShowHidden] = useState(false);
    const [showUnanswered, setShowUnanswered] = useState(false);
    const { currentUser } = useAuth();
    const { setLoading } = useLoading();

    /** Loads all questions from the database. */
    const getData = async () => {
        setLoading(true);
        const models = await getQuestions();
        setQuestions(models);
        setLoading(false);
    };

    useEffect(() => {
        getData();
    }, []);

    /** Filters models based on hidden toggle. */
    const filterByHidden = (list: QuestionModel[], show: boolean) => {
        return list.filter((q) => (show ? q.usersHidden?.includes(currentUser!.uid!) : !q.usersHidden?.includes(currentUser!.uid!)));
    };

    /** Filters models by unanswered status */
    const filterByUnanswered = (list: QuestionModel[], show: boolean) => {
        return list.filter((q) => (show ? !q.status === show : q));
    };

    /** Filters models based on search string. */
    const filterBySearch = (list: QuestionModel[], term: string) => {
        if (!term.trim()) return list;
        return list.filter((q) => q.title.toLowerCase().includes(term.toLowerCase()) || q.tags.toLowerCase().includes(term.toLowerCase()));
    };

    /** Filters models based on created date. */
    const filterByDate = (list: QuestionModel[], inputValue: string) => {
        if (!inputValue) return list;
        const searchDate = new Date(inputValue);
        const d = searchDate.getDate();
        const m = searchDate.getMonth();
        const y = searchDate.getFullYear();
        return list.filter((q) => {
            const created = q.createdAt.toDate();
            return created.getDate() === d && created.getMonth() === m && created.getFullYear() === y;
        });
    };


    /** Applies hidden, text, and date filters in order. */
    const applyFilters = (data: QuestionModel[], hidden: boolean, unanswered: boolean, text: string, date: string) => {
        const byHidden = filterByHidden(data, hidden);
        const byUnanswered = filterByUnanswered(byHidden, unanswered);
        const byText = filterBySearch(byUnanswered, text);
        const byDate = filterByDate(byText, date);
        setFilteredQuestions(byDate);
    };

    /** Applies all filters when input changes. */
    useEffect(() => {
        applyFilters(questions, showHidden, showUnanswered, searchTerm, searchDate);
    }, [questions, showHidden, showUnanswered, searchTerm, searchDate]);

    /** Updates local state with the latest question and re-filters. */
    const updateLocalQuestion = (updated: QuestionModel) => {
        setQuestions((prev) => prev.map((q) => (q.id === updated.id ? updated : q)));
    };

    /** Adds current user to usersHidden array. */
    const handleHideQuestion = async (q: QuestionModel) => {
        setLoading(true);
        if (!currentUser?.uid || q.usersHidden?.includes(currentUser.uid)) return;
        if (!q.usersHidden) q.usersHidden = [];
        const updated = { ...q, usersHidden: [...q.usersHidden, currentUser.uid] };
        const updateDto = mapQuestionToQuestionUpdate(updated);
        await updateQuestion(updateDto, updated.id);
        updateLocalQuestion(updated);
        setLoading(false);
    };

    /** Removes current user from usersHidden array. */
    const handleShowQuestion = async (q: QuestionModel) => {
        setLoading(true);
        if (!currentUser?.uid || !q.usersHidden?.includes(currentUser.uid)) return;
        const filtered = q.usersHidden.filter((uid) => uid !== currentUser.uid);
        const updated = { ...q, usersHidden: filtered };
        const updateDto = mapQuestionToQuestionUpdate(updated);
        await updateQuestion(updateDto, updated.id);
        updateLocalQuestion(updated);
        setLoading(false);
    };

    /** Clears the filters in the component. */
    const handleClearFiltersChange = () => {
        setSearchTerm("");
        setSearchDate("");
        setShowHidden(false);
        setShowUnanswered(false);
    };

    return (
        <>
            <QuestionFilter title="Questions" onSearchTextChange={setSearchTerm} onSearchDateChange={setSearchDate} onShowHiddenChange={setShowHidden} onShowUnansweredChange={setShowUnanswered} onClearFiltersChange={handleClearFiltersChange} />
            <div className="row g-4">
                {filteredQuestions.map((question) => (
                    <div className="col-lg-4 col-md-6 col-sm-6" key={question.id}>
                        <QuestionCard value={question} onHidden={handleHideQuestion} onShow={handleShowQuestion} />
                    </div>
                ))}
            </div>
        </>
    );
}
