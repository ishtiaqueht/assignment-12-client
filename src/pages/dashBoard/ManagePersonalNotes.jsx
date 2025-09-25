import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/UseAuth";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/UseAxiosSecure";

const ManagePersonalNotes = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [editingNote, setEditingNote] = useState(null);

  // ✅ Fetch notes
  const { data: notes = [], refetch, isLoading } = useQuery({
    queryKey: ["notes", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/notes?email=${user.email}`);
      return res.data;
    },
  });

  // ✅ Delete Note
const handleDelete = async (id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "This action cannot be undone!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/notes/${id}`);
        toast.success("Note deleted successfully!");
        refetch();

        Swal.fire("Deleted!", "Your note has been deleted.", "success");
      } catch (err) {
        console.error(err);
        toast.error("Failed to delete note");
        Swal.fire("Error!", "Something went wrong.", "error");
      }
    }
  });
}

  // ✅ Update Note
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { title, description } = editingNote;
      await axiosSecure.put(`/notes/${editingNote._id}`, { title, description });
      toast.success("Note updated successfully!");
      setEditingNote(null);
      refetch();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update note");
    }
  };

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">My Notes</h2>
      {notes.length === 0 ? (
        <p className="text-gray-600">You haven’t created any notes yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {notes.map((note) => (
            <div
              key={note._id}
              className="border rounded-lg shadow-md bg-white p-4 flex flex-col"
            >
              {editingNote?._id === note._id ? (
                <form onSubmit={handleUpdate} className="space-y-3">
                  <input
                    type="text"
                    value={editingNote.title}
                    onChange={(e) =>
                      setEditingNote({ ...editingNote, title: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                  <textarea
                    rows="3"
                    value={editingNote.description}
                    onChange={(e) =>
                      setEditingNote({
                        ...editingNote,
                        description: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border rounded-lg"
                  ></textarea>
                  <div className="flex gap-3">
                    <button
                      type="submit"
                      className="px-3 py-1 bg-green-600 text-white rounded"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingNote(null)}
                      className="px-3 py-1 bg-gray-400 text-white rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <h3 className="text-lg font-semibold mb-1">{note.title}</h3>
                  <p className="text-gray-600 flex-1">{note.description}</p>
                  <div className="mt-3 flex gap-3">
                    <button
                      onClick={() => setEditingNote(note)}
                      className="px-3 py-1 bg-blue-600 text-white rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(note._id)}
                      className="px-3 py-1 bg-red-600 text-white rounded"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManagePersonalNotes;
