import Foundation

struct Pokemon: Identifiable, Codable {
    let id: Int
    var nickname: String?
    var level: Int
    var xp: Int
    var isInParty: Bool
    var userId: Int
    
    // 🔹 Client-side only properties (UI logic)
    var displayName: String {
        nickname ?? "Unnamed Pokémon"
    }
    
    // Example XP/Leveling system: progress to next level
    var progressToNextLevel: Double {
        let xpForNext = level * 100  // placeholder formula
        return Double(xp) / Double(xpForNext)
    }
    
    // For showing party status in UI
    var statusText: String {
        isInParty ? "In Party" : "Storage"
    }
    
    enum CodingKeys: String, CodingKey {
        case id, nickname, level, xp
        case isInParty = "is_in_party"
        case userId = "user_id"
    }
}