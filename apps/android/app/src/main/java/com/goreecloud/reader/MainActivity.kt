package com.goreecloud.reader

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.AssistChip
import androidx.compose.material3.AssistChipDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.LinearProgressIndicator
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            MaterialTheme {
                Surface(modifier = Modifier.fillMaxSize()) {
                    ReaderFoundationApp()
                }
            }
        }
    }
}

data class PreviewItem(
    val title: String,
    val creator: String,
    val kind: String,
    val progress: Float,
)

private val syntheticItems = listOf(
    PreviewItem("The Quiet Orbit", "Avery North", "Book", 0.42f),
    PreviewItem("Lantern District", "Mika Arai", "Manga", 0.67f),
    PreviewItem("Signal House", "Rowan Vale", "Comic", 0.18f),
    PreviewItem("Northbound", "Elena Brooks", "Audiobook", 0.54f),
    PreviewItem("Paper Moons", "Jordan Lee", "Book", 0.0f),
    PreviewItem("After the Rain Gate", "Ren Sato", "Manga", 0.0f),
)

@Composable
fun ReaderFoundationApp() {
    var query by remember { mutableStateOf("") }
    var kind by remember { mutableStateOf("All") }
    val kinds = listOf("All", "Book", "Manga", "Comic", "Audiobook")
    val filtered = syntheticItems.filter { item ->
        (kind == "All" || item.kind == kind) &&
            (query.isBlank() || item.title.contains(query, ignoreCase = true) || item.creator.contains(query, ignoreCase = true))
    }

    Scaffold { innerPadding ->
        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding)
                .padding(horizontal = 20.dp),
            verticalArrangement = Arrangement.spacedBy(12.dp),
        ) {
            item {
                Spacer(Modifier.height(18.dp))
                Text("GOREECLOUD READER", style = MaterialTheme.typography.labelMedium, color = MaterialTheme.colorScheme.primary)
                Text("Your Library", style = MaterialTheme.typography.headlineLarge, fontWeight = FontWeight.Bold)
                Text(
                    "Synthetic Preview · No personal media is loaded or transmitted.",
                    style = MaterialTheme.typography.bodyMedium,
                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                )
                Spacer(Modifier.height(16.dp))
                OutlinedTextField(
                    value = query,
                    onValueChange = { query = it },
                    modifier = Modifier.fillMaxWidth(),
                    singleLine = true,
                    label = { Text("Search synthetic titles") },
                )
            }
            item {
                Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    kinds.forEach { candidate ->
                        AssistChip(
                            onClick = { kind = candidate },
                            label = { Text(candidate) },
                            colors = if (candidate == kind) {
                                AssistChipDefaults.assistChipColors(containerColor = MaterialTheme.colorScheme.secondaryContainer)
                            } else AssistChipDefaults.assistChipColors(),
                        )
                    }
                }
            }
            item {
                Text("${filtered.size} synthetic titles", style = MaterialTheme.typography.titleMedium)
            }
            items(filtered) { item ->
                PreviewCard(item)
            }
            item {
                Card(
                    colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant),
                    shape = RoundedCornerShape(20.dp),
                    modifier = Modifier.fillMaxWidth(),
                ) {
                    Column(Modifier.padding(18.dp)) {
                        Text("Foundation boundary", fontWeight = FontWeight.Bold)
                        Text(
                            "Real import, reading, playback, sync, downloads, and account processing remain unavailable until required GoreeCloud Platform-System boundaries are implemented and accepted.",
                            color = MaterialTheme.colorScheme.onSurfaceVariant,
                        )
                    }
                }
                Spacer(Modifier.height(24.dp))
            }
        }
    }
}

@Composable
private fun PreviewCard(item: PreviewItem) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        shape = RoundedCornerShape(20.dp),
    ) {
        Column(Modifier.padding(18.dp)) {
            Text(item.kind.uppercase(), style = MaterialTheme.typography.labelSmall, color = MaterialTheme.colorScheme.primary)
            Text(item.title, style = MaterialTheme.typography.titleLarge, fontWeight = FontWeight.SemiBold)
            Text(item.creator, color = MaterialTheme.colorScheme.onSurfaceVariant)
            if (item.progress > 0f) {
                Spacer(Modifier.height(12.dp))
                LinearProgressIndicator(
                    progress = { item.progress },
                    modifier = Modifier.fillMaxWidth(),
                )
                Text("${(item.progress * 100).toInt()}% synthetic progress", style = MaterialTheme.typography.labelSmall)
            }
        }
    }
}
