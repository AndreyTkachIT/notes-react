import React, {useContext} from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import {AlertContext} from "../context/alert/alertContext";

export const Notes = ({notes, onRemove}) => {

    const alert = useContext(AlertContext);

    function removeNote(id, title) {
        onRemove(id);
        alert.show(`Заметка "${title}" была удалена!`, 'danger', 3000);
    }

    return (
        <TransitionGroup component="ul" className="list-group">
            {notes.map(note => {
                const date = new Date(note.date);
                const formattedDate = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`;
                return (
                    <CSSTransition
                        key={note.id}
                        classNames={'note'}
                        timeout={300}
                    >
                        <li className="list-group-item note">
                            <div>
                                <strong>{note.title}</strong>
                                <small>{formattedDate}</small>
                            </div>
                            <button
                                type="button"
                                className="btn btn-outline-danger btn-sm"
                                onClick={() => removeNote(note.id, note.title)}
                            >
                                &times;
                            </button>
                        </li>
                    </CSSTransition>
                )})}
        </TransitionGroup>
    )
};
