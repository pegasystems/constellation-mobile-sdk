import UIKit

class GradientViewController: UIViewController {
    override func viewDidLoad() {
        super.viewDidLoad()
        
        let gradient = CAGradientLayer()
        gradient.frame = view.bounds
        gradient.colors = [
            UIColor(red: 58/255, green: 81/255, blue: 221/255, alpha: 1).cgColor,
            UIColor(red: 5/255, green: 21/255, blue: 59/255, alpha: 1).cgColor
        ]
        gradient.startPoint = CGPoint(x: 0.5, y: 0.0) // Top center
        gradient.endPoint = CGPoint(x: 0.5, y: 1.0)   // Bottom center
        view.layer.insertSublayer(gradient, at: 0)
    }
}
