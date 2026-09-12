package com.amerhwitat.bizx.mobile

import android.app.Activity
import android.os.Bundle
import android.view.Gravity
import android.widget.Button
import android.widget.LinearLayout
import android.widget.TextView

class MainActivity : Activity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val root = LinearLayout(this).apply {
            orientation = LinearLayout.VERTICAL
            gravity = Gravity.CENTER
            setPadding(32, 32, 32, 32)
        }
        val title = TextView(this).apply { text = "BizX — Kotlin Mobile"; textSize = 24f; gravity = Gravity.CENTER }
        val state = TextView(this).apply {
            text = "128D state: ready\nBusiness workspace: mobile-safe\nP2P: opt-in / authenticated only"
            textSize = 16f
            gravity = Gravity.CENTER
            setPadding(0, 24, 0, 24)
        }
        val action = Button(this).apply {
            text = "Initialize BizX"
            setOnClickListener { state.text = "128D state: active\nBusiness workspace: initialized\nP2P: awaiting trusted peer" }
        }
        root.addView(title)
        root.addView(state)
        root.addView(action)
        setContentView(root)
    }
}
