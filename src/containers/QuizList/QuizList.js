import React from 'react';
import classes from './QuizList.css';
import { NavLink } from "react-router-dom";
import Loader from "../../components/UI/Loader/Loader";
import axios from '../../axios/axios-quiz';

class QuizList extends React.Component {
    state = {
        quizes: [],
        loading: true
    }

    renderQuizes () {
        return this.state.quizes.map((quiz, index) => {
           return (
               <li
                   key={quiz.id}
               >
                   <NavLink
                       to={'/quiz/' + quiz.id}
                   >
                       {quiz.name}
                   </NavLink>
               </li>
           )
        });
    }

    async componentDidMount() {
        try {
            const response = await axios.get('/quizes.json');

            let quizes = [];
            Object.keys(response.data).forEach((key, index) => {
                quizes.push({
                    id: key,
                    name: `Quiz #${index + 1}`
                });
            });

            this.setState({
                quizes,
                loading: false
            });
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        return (
            <div className={classes.QuizList}>
                <div>
                    <h1>Quiz List</h1>

                    { this.state.loading
                        ? <Loader />
                        : <ul>
                            { this.renderQuizes() }
                        </ul>
                    }
                </div>
            </div>
        )
    }
}

export default QuizList;