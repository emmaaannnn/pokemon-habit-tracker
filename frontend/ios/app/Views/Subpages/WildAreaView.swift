import SwiftUI

struct WildAreaView: View {
    var body: some View {
        NavigationView {
            VStack {
                Text("Welcome to Wild Area!")
                    .font(.title)
            }
            .navigationTitle("WildAreaView")
        }
    }
}
