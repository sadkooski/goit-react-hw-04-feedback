export const FeedbackOptions = ({ onLeaveFeedback }) => {
  return (
    <ul className="buttons-list">
      <li className="button-element">
        <button
          onClick={onLeaveFeedback}
          type="submit"
          className="button"
          data-variant="good"
        >
          Good
        </button>
      </li>
      <li className="button-element">
        <button
          onClick={onLeaveFeedback}
          type="submit"
          className="button"
          data-variant="neutral"
        >
          Neutral
        </button>
      </li>
      <li className="button-element">
        <button
          onClick={onLeaveFeedback}
          type="submit"
          className="button"
          data-variant="bad"
        >
          Bad
        </button>
      </li>
    </ul>
  );
};
