import React from 'react';
import classes from './ActiveQuiz.css';
import AnswersList from '../AnswersList/AnswersList';

const ActiveQuiz = props => (
    <div className={classes.ActiveQuiz}>
        <p className={classes.Question}>
            <span>
                <strong>{props.activeQuestion}.</strong>&nbsp;
                {props.question}
            </span>

            <small>{props.activeQuestion}/{props.quizLength}</small>
        </p>

        <AnswersList 
            state={props.state}
            answers={props.answers}
            onAnswerClick={props.onAnswerClick}
        />
    </div>
);

export default ActiveQuiz;