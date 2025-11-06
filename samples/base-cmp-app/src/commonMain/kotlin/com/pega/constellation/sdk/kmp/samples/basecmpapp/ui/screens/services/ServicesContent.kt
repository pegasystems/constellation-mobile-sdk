import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.Button
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.pega.constellation.sdk.kmp.samples.basecmpapp.ui.screens.pega.Assignment

@Composable
fun ServicesContent(
    assignments: List<Assignment>,
    onAssignmentClicked: (Assignment) -> Unit,
    onReloadClicked: () -> Unit
) {
    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(MaterialTheme.colorScheme.background),
        contentAlignment = Alignment.Center
    ) {
        if (assignments.isEmpty()) {
            Column(horizontalAlignment = Alignment.CenterHorizontally) {
                Text(
                    text = "No assignments available.",
                    fontWeight = FontWeight.Bold,
                    fontSize = MaterialTheme.typography.titleMedium.fontSize,
                    color = MaterialTheme.colorScheme.onBackground
                )
                Button(
                    onClick = onReloadClicked,
                    modifier = Modifier.padding(top = 16.dp)
                ) {
                    Text("Reload")
                }
            }
        } else {
            LazyColumn(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(16.dp)
            ) {
                items(assignments) { assignment ->
                    Column(
                        modifier = Modifier
                            .fillMaxWidth()
                            .clickable { onAssignmentClicked(assignment) }
                            .padding(vertical = 8.dp)
                    ) {
                        Text(
                            text = "${assignment.pxTaskLabel} in \"${assignment.pyLabel}\"",
                            fontWeight = FontWeight.Bold,
                            fontSize = MaterialTheme.typography.titleMedium.fontSize,
                            color = MaterialTheme.colorScheme.primary
                        )
                        Text(
                            text = assignment.pxRefObjectKey,
                            fontSize = MaterialTheme.typography.bodyMedium.fontSize,
                            color = MaterialTheme.colorScheme.onBackground
                        )
                    }
                }
            }
        }
    }
}