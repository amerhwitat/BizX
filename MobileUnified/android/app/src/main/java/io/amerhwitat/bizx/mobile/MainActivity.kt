package io.amerhwitat.bizx.mobile

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val state = MobileGameEngine.start(mode = "tycoon")
        setContent { BizXScreen(state) }
    }
}

@Composable
private fun BizXScreen(state: MobileGameState) {
    MaterialTheme { Text("BizX • ${state.mode} • BIZ virtual economy • Cash ${state.cash}") }
}
