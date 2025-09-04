import SwiftUI

struct HomeView: View {
    var body: some View {
        NavigationView {
            VStack {
                Text("Welcome Trainer!")
                    .font(.title)
            }
            .navigationTitle("Home")
        }
    }
}
