import Foundation

struct Habit: Identifiable, Codable {
    let id: Int
    var name: String
    var userId: Int
    var frequencyPerWeek: Int
    var streakCount: Int
    var lastCompleted: Date?
    var createdAt: Date
    
    // 🔹 Client-side only fields (UI state)
    var isCompletedToday: Bool = false
    
    // 🔹 Example computed property for UI
    var frequencyText: String {
        "\(frequencyPerWeek)x per week"
    }
}