import React, { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import Note from './Note';
import CreateArea from './CreateArea';
import { dkeeper } from '../../../declarations/dkeeper';

function App(){
    const [listItem, setListItem] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData(){
        const listNotes = await dkeeper.readNotes();
        setListItem(listNotes);
    }

    function addItem(item){
        setListItem(previous => {
            dkeeper.createNote(item.title, item.content);
            return [
                item,
                ...previous
            ]
        });
    }

    function deleteItem(id){
        dkeeper.deleteNote(id);
        setListItem(previous => {
            return previous.filter((item, index) => {
                return index !== id
            });
        });
    }

    return (
        <div>
            <Header />
            <CreateArea addList={addItem}/>
            {listItem.map((item, index) => (
                <Note   
                    key={index} 
                    id={index}
                    title={item.title} 
                    content={item.content}
                    delete={deleteItem}
                /> 
            ))}
            <Footer />    
        </div>
    );
}

export default App;