import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Plus,
  Edit,
  Trash2,
  Heart,
  PawPrint,
  User,
  Calendar,
  Hash,
  AlertCircle,
  Check,
  X,
} from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import {
  createPet,
  fetchPets,
  updatePet,
  deletePet,
  clearError,
  clearSuccess,
} from "../features/pets/petSlice";

export default function PetManagement() {
  const dispatch = useDispatch();
  const { pets, loading, error, success } = useSelector((state) => state.pets);
  const { user } = useSelector((state) => state.auth);

  const [showForm, setShowForm] = useState(false);
  const [editingPet, setEditingPet] = useState(null);
  const [petForm, setPetForm] = useState({
    name: "",
    breed: "",
    age: "",
    gender: "",
    description: "",
  });

  // Clear messages when component mounts
  useEffect(() => {
    dispatch(clearError());
    dispatch(clearSuccess());
    dispatch(fetchPets());
  }, [dispatch]);

  // Clear success message after 3 seconds
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        dispatch(clearSuccess());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPetForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingPet) {
      dispatch(updatePet({ petId: editingPet._id, petData: petForm }));
    } else {
      dispatch(createPet(petForm));
    }
    
    // Reset form
    setPetForm({
      name: "",
      breed: "",
      age: "",
      gender: "",
      description: "",
    });
    setEditingPet(null);
    setShowForm(false);
  };

  const handleEdit = (pet) => {
    setEditingPet(pet);
    setPetForm({
      name: pet.name,
      breed: pet.breed,
      age: pet.age.toString(),
      gender: pet.gender,
      description: pet.description,
    });
    setShowForm(true);
  };

  const handleDelete = (petId) => {
    if (window.confirm("Are you sure you want to delete this pet?")) {
      dispatch(deletePet(petId));
    }
  };

  const resetForm = () => {
    setPetForm({
      name: "",
      breed: "",
      age: "",
      gender: "",
      description: "",
    });
    setEditingPet(null);
    setShowForm(false);
  };

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      window.location.href = "/login";
    }
  }, [user]);

  if (!user) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-100 to-gray-300">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow p-6 md:p-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 mt-6">
            <div>
              <h1 className="text-4xl font-bold mb-2 flex items-center text-gray-800">
                {/* <Heart className="mr-3 text-pink-600" /> */}
                My Pets
              </h1>
              <p className="text-gray-600 text-lg">
                Manage your pet profiles and training information
              </p>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-700 hover:opacity-90 px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-all duration-300 hover:shadow-lg text-white mt-4 md:mt-0"
            >
              <Plus className="w-5 h-5" />
              Add Pet
            </button>
          </div>

          {/* Messages */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3 mb-6">
              <AlertCircle className="text-red-500 w-5 h-5" />
              <p className="text-red-700">{error}</p>
              <button onClick={() => dispatch(clearError())} className="ml-auto">
                <X className="w-4 h-4 text-red-500" />
              </button>
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3 mb-6">
              <Check className="text-green-500 w-5 h-5" />
              <p className="text-green-700">{success}</p>
              <button onClick={() => dispatch(clearSuccess())} className="ml-auto">
                <X className="w-4 h-4 text-green-500" />
              </button>
            </div>
          )}

          {/* Pet Form Modal */}
          {showForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-2xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {editingPet ? "Edit Pet" : "Add New Pet"}
                  </h2>
                  <button
                    onClick={resetForm}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name and Breed */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Pet Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={petForm.name}
                        onChange={handleChange}
                        required
                        placeholder="Enter pet name"
                        className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Breed
                      </label>
                      <input
                        type="text"
                        name="breed"
                        value={petForm.breed}
                        onChange={handleChange}
                        required
                        placeholder="Enter breed"
                        className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                      />
                    </div>
                  </div>

                  {/* Age and Gender */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Age (years)
                      </label>
                      <input
                        type="number"
                        name="age"
                        value={petForm.age}
                        onChange={handleChange}
                        required
                        min="0"
                        placeholder="Enter age"
                        className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Gender
                      </label>
                      <select
                        name="gender"
                        value={petForm.gender}
                        onChange={handleChange}
                        required
                        className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                      >
                        <option value="">Select gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={petForm.description}
                      onChange={handleChange}
                      required
                      rows="4"
                      placeholder="Describe your pet's personality, behavior, or any special notes..."
                      className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                    />
                  </div>

                  {/* Form Actions */}
                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-blue-700 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-all duration-300 hover:shadow-lg text-white"
                    >
                      {loading ? "Saving..." : editingPet ? "Update Pet" : "Add Pet"}
                      <PawPrint className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={resetForm}
                      className="bg-gray-500 hover:opacity-90 px-6 py-3 rounded-lg font-medium transition-all duration-300 text-white"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Pets Grid */}
          {loading && pets.length === 0 ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
            </div>
          ) : pets.length === 0 ? (
            <div className="text-center py-12">
              <PawPrint className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No pets added yet
              </h3>
              <p className="text-gray-500 mb-6">
                Start by adding your first pet profile
              </p>
              <button
                onClick={() => setShowForm(true)}
                className="bg-blue-700 hover:opacity-90 px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-all duration-300 hover:shadow-lg text-white mx-auto"
              >
                <Plus className="w-5 h-5" />
                Add Your First Pet
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pets.map((pet) => (
                <div
                  key={pet._id}
                  className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-pink-100 p-3 rounded-full">
                        <Heart className="w-6 h-6 text-pink-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">
                          {pet.name}
                        </h3>
                        <p className="text-gray-600">{pet.breed}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(pet)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit pet"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(pet._id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete pet"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>{pet.age} years old</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <User className="w-4 h-4" />
                      <span>{pet.gender}</span>
                    </div>
                    <div className="pt-3 border-t border-gray-200">
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {pet.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
