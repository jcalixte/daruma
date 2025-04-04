import React, { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"
import { Plus, Eye, Check, Trash2 } from "lucide-react"
import type { Daruma } from "../lib/supabase"
import { DarumaSvg } from "./DarumaSvg"

export function DarumaList() {
  const [darumas, setDarumas] = useState<Daruma[]>([])
  const [loading, setLoading] = useState(true)
  const [newWish, setNewWish] = useState("")
  const [selectedColor, setSelectedColor] = useState("red")

  const colors = ["red", "blue", "green", "gold", "purple"]

  useEffect(() => {
    fetchDarumas()
  }, [])

  async function fetchDarumas() {
    try {
      const { data, error } = await supabase
        .from("darumas")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) throw error
      setDarumas(data || [])
    } catch (error) {
      console.error("Error fetching darumas:", error)
      alert("Error fetching darumas!")
    } finally {
      setLoading(false)
    }
  }

  async function createDaruma(e: React.FormEvent) {
    e.preventDefault()
    const user = await supabase.auth.getUser()
    try {
      const { error } = await supabase.from("darumas").insert([
        {
          wish: newWish,
          color: selectedColor,
          user_id: user.data.user?.id,
        },
      ])

      if (error) throw error
      setNewWish("")
      fetchDarumas()
    } catch (error) {
      console.error("Error creating daruma:", error)
      alert("Error creating daruma!")
    }
  }

  async function drawFirstEye(id: string) {
    try {
      const { error } = await supabase
        .from("darumas")
        .update({ first_eye_date: new Date().toISOString() })
        .eq("id", id)

      if (error) throw error
      fetchDarumas()
    } catch (error) {
      console.error("Error drawing first eye:", error)
      alert("Error updating daruma!")
    }
  }

  async function drawSecondEye(id: string) {
    try {
      const { error } = await supabase
        .from("darumas")
        .update({ second_eye_date: new Date().toISOString() })
        .eq("id", id)

      if (error) throw error
      fetchDarumas()
    } catch (error) {
      console.error("Error drawing second eye:", error)
      alert("Error updating daruma!")
    }
  }

  async function deleteDaruma(id: string) {
    try {
      const { error } = await supabase.from("darumas").delete().eq("id", id)

      if (error) throw error
      fetchDarumas()
    } catch (error) {
      console.error("Error deleting daruma:", error)
      alert("Error deleting daruma!")
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <form
        onSubmit={createDaruma}
        className="mb-8 bg-white p-6 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold mb-4">Create New Daruma</h2>
        <div className="flex gap-4 items-center">
          <DarumaSvg color={selectedColor} className="flex-shrink-0" />
          <input
            type="text"
            value={newWish}
            onChange={(e) => setNewWish(e.target.value)}
            placeholder="Enter your wish or commitment"
            className="flex-1 p-2 border rounded"
            required
          />
          <select
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
            className="p-2 border rounded"
          >
            {colors.map((color) => (
              <option key={color} value={color}>
                {color.charAt(0).toUpperCase() + color.slice(1)}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 flex items-center gap-2"
          >
            <Plus size={20} />
            Add Daruma
          </button>
        </div>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {darumas.map((daruma) => (
          <div
            key={daruma.id}
            className={`bg-white p-6 rounded-lg shadow-md border-t-8 border-${daruma.color}-500`}
          >
            <div className="flex items-center gap-4 mb-4">
              <DarumaSvg
                color={daruma.color}
                hasFirstEye={!!daruma.first_eye_date}
                hasSecondEye={!!daruma.second_eye_date}
              />
              <p className="text-lg font-medium">{daruma.wish}</p>
            </div>
            <div className="flex justify-between items-center">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Eye
                    size={20}
                    className={
                      daruma.first_eye_date ? "text-green-500" : "text-gray-300"
                    }
                  />
                  <span className="text-sm">
                    {daruma.first_eye_date
                      ? new Date(daruma.first_eye_date).toLocaleDateString()
                      : "Not started"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Check
                    size={20}
                    className={
                      daruma.second_eye_date
                        ? "text-green-500"
                        : "text-gray-300"
                    }
                  />
                  <span className="text-sm">
                    {daruma.second_eye_date
                      ? new Date(daruma.second_eye_date).toLocaleDateString()
                      : "Not completed"}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                {!daruma.first_eye_date && (
                  <button
                    onClick={() => drawFirstEye(daruma.id)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                    title="Draw first eye"
                  >
                    <Eye size={20} />
                  </button>
                )}
                {daruma.first_eye_date && !daruma.second_eye_date && (
                  <button
                    onClick={() => drawSecondEye(daruma.id)}
                    className="p-2 text-green-600 hover:bg-green-50 rounded"
                    title="Draw second eye"
                  >
                    <Check size={20} />
                  </button>
                )}
                <button
                  onClick={() => deleteDaruma(daruma.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded"
                  title="Delete daruma"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
