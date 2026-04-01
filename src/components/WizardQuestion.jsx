import DateSelector from './DateSelector';

export default function WizardQuestion({ 
  questionLabel, 
  questionType, 
  placeholder, 
  value, 
  onChange, 
  error, 
  isDateStep, 
  dateValue 
}) {
  return (
    <div className="wizard-body">
      <div className="question-text">{questionLabel}</div>
      
      {error && <div className="error-message">{error}</div>}
      
      {isDateStep ? (
        <DateSelector fechaNacimiento={dateValue} onChange={onChange} />
      ) : (
        <input
          type={questionType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="wizard-input"
          autoFocus
        />
      )}
    </div>
  );
}
