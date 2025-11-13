package com.pega.constellation.sdk.kmp.samples.basecmpapp.ui.screens.services

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.Button
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel
import com.pega.constellation.sdk.kmp.samples.basecmpapp.data.Assignment
import com.pega.constellation.sdk.kmp.samples.basecmpapp.ui.screens.pega.PegaViewModel
import com.pega.constellation.sdk.kmp.samples.basecmpapp.ui.screens.services.ServicesViewModel.UiState

@Composable
fun ServicesScreen(
    pegaViewModel: PegaViewModel,
    servicesViewModel: ServicesViewModel = viewModel(factory = ServicesViewModel.Factory),
) {
    val uiState by servicesViewModel.uiState.collectAsState()

    LaunchedEffect(Unit) {
        servicesViewModel.loadAssignments()
    }

    ServicesScreen(
        uiState = uiState,
        onAssignmentClicked = { pegaViewModel.openAssignment(it.pzInsKey) },
        onReload = { servicesViewModel.loadAssignments() }
    )
}

@Composable
private fun ServicesScreen(
    uiState: UiState,
    onAssignmentClicked: (Assignment) -> Unit,
    onReload: () -> Unit
) {
    when (uiState) {
        is UiState.Loading -> FullScreenInfo("Loading assignments...")
        is UiState.Error -> FullScreenInfo("Error loading assignments.", "Retry", onReload)
        is UiState.Success -> AssignmentList(uiState.assignments, onAssignmentClicked, onReload)
    }
}

@Composable
fun AssignmentList(
    assignments: List<Assignment>,
    onAssignmentClicked: (Assignment) -> Unit,
    onReload: () -> Unit
) {
    if (assignments.isEmpty()) {
        FullScreenInfo("No assignments available.", "Reload", onReload)
        return
    }

    LazyColumn(Modifier.fillMaxWidth().padding(16.dp)) {
        items(assignments) { AssignmentCard(it, onAssignmentClicked) }
    }
}

@Composable
private fun AssignmentCard(assignment: Assignment, onAssignmentClicked: (Assignment) -> Unit) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(8.dp),
        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp),
        colors = CardDefaults.cardColors(
            containerColor = MaterialTheme.colorScheme.secondaryContainer
        )
    ) {
        Row(
            modifier = Modifier.fillMaxWidth()
                .clickable { onAssignmentClicked(assignment) }
                .padding(8.dp),
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            Column(Modifier.weight(1f)) {
                Text(
                    text = "${assignment.pxTaskLabel} in \"${assignment.pyLabel}\"",
                    fontWeight = FontWeight.Bold,
                    fontSize = MaterialTheme.typography.titleMedium.fontSize,
                    color = MaterialTheme.colorScheme.primary
                )
                Text(
                    text = assignment.pxRefObjectInsName,
                    fontSize = MaterialTheme.typography.bodyMedium.fontSize,
                    color = MaterialTheme.colorScheme.onBackground
                )
            }
            Text(
                text = assignment.pxUrgencyAssign.toString(),
                modifier = Modifier.align(Alignment.CenterVertically).padding(8.dp),
                style = MaterialTheme.typography.bodyLarge,
                fontWeight = FontWeight.Bold
            )
        }
    }
}

@Composable
private fun FullScreenInfo(info: String, action: String? = null, onAction: () -> Unit = {}) {
    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(MaterialTheme.colorScheme.background),
        contentAlignment = Alignment.Center
    ) {
        Column(horizontalAlignment = Alignment.CenterHorizontally) {
            Text(
                text = info,
                fontWeight = FontWeight.Bold,
                fontSize = MaterialTheme.typography.titleMedium.fontSize,
                color = MaterialTheme.colorScheme.onBackground
            )
            if (action != null) {
                Button(
                    onClick = onAction,
                    modifier = Modifier.padding(top = 16.dp)
                ) {
                    Text(action)
                }
            }
        }
    }
}
