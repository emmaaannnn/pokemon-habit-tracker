import SwiftUI

struct HabitsViewModel: View {
    var body: some View {
        NavigationView {
            VStack {
                Text("Welcome Trainer!")
                    .font(.title)
            }
            .navigationTitle("Habits")
        }
    }
}
