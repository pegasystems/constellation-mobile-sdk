import UIKit
import SwiftUI
import BaseCmpApp

struct ComposeView: UIViewControllerRepresentable {
    func makeUIViewController(context: Context) -> UIViewController {
        let authManager = MediaCoViewControllerKt.createAuthManager()
        let provider = AuthenticatedResourceProvider(authManager: authManager)
        let engineBuilder = BuilderWrapper(customResourceProvider: provider)
        return MediaCoViewControllerKt.MediaCoViewController(
            authManager: authManager,
            engineBuilder: engineBuilder
        )
    }

    func updateUIViewController(_ uiViewController: UIViewController, context: Context) {}
}

struct ContentView: View {
    var body: some View {
        ComposeView()
            .ignoresSafeArea()
    }
}
