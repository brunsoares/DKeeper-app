import List "mo:base/List";

actor DKepper{

  public type Note = {
    title: Text;
    content: Text;
  };

  stable var notes: List.List<Note> = List.nil<Note>();

  public func createNote(titleNote: Text, contentNote: Text){
    var newNote: Note = {
      title = titleNote;
      content = contentNote;
    };

    notes := List.push(newNote, notes);
  };

  public query func readNotes(): async [Note]{
    return List.toArray(notes);
  };

  public func deleteNote(id: Nat){
    var saveNotes = List.take(notes, id);
    notes := List.drop(notes, id+1);
    notes := List.append(saveNotes, notes);
    
  } 

}