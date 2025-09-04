import SwiftUI

struct PokemonView: View {
    var body: some View {
        NavigationView {
            VStack {
                Text("Your Pokemon!")
                    .font(.title)
                
                NavigationLink("Go to Shop") {
                    ShopView()
                }
                
                NavigationLink("Explore Wild Area") {
                    WildAreaView()
                }
            }
            .navigationTitle("Pokemon")
        }
    }
}
