//
//  ContentView.swift
//  ios
//
//  Created by Emmanuel Almonte on 21/8/2025.
//

import SwiftUI

struct ContentView: View {
    var body: some View {
        VStack {
            Image(systemName: "globe")
                .imageScale(.large)
                .foregroundStyle(.tint)
            Text("Hello, world!")
                .foregroundStyle(.red)
        }
        .padding()
        
        VStack {
            HStack{
                Image(systemName: "pencil")
                    .imageScale(.large)
                    .foregroundStyle(.tint)
                Text("SwiftUI")
                    .fontWeight(.bold)
                    .foregroundColor(.blue)
                    
                    
            }
        }
            
        .padding()
    }
}

#Preview {
    ContentView()
}
