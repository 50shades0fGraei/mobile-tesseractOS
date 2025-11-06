package com.example.tesseractremote

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.text.method.ScrollingMovementMethod
import android.widget.Button
import com.android.volley.Request
import com.android.volley.toolbox.StringRequest
import com.android.volley.toolbox.Volley
import com.example.codemap.BenchmarkActivity
import com.example.tesseractremote.databinding.ActivityMainBinding
import org.json.JSONObject

class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding

    // !!! IMPORTANT !!!
    // You must replace this with the URL of your API bridge preview.
    private val apiBridgeBaseUrl = "REPLACE_WITH_YOUR_API_PREVIEW_URL"

    // A list of the actions the Jin can perform.
    private val actions = listOf(
        "add_lovelace_as_contact_for_hopper",
        "fetch_remote_data",
        "list_all_files",
        "read_the_manifesto",
        "run_diagnostics"
    )

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        // Make the text view scrollable
        binding.textView.movementMethod = ScrollingMovementMethod()

        // Set up the benchmark button
        binding.benchmarkButton.setOnClickListener {
            val intent = Intent(this, BenchmarkActivity::class.java)
            startActivity(intent)
        }

        // Dynamically create a button for each action
        actions.forEach { actionId ->
            val button = Button(this).apply {
                text = actionId.replace('_', ' ').capitalize()
                setOnClickListener {
                    runAction(actionId)
                }
            }
            binding.buttonContainer.addView(button)
        }
    }

    private fun runAction(actionId: String) {
        if (apiBridgeBaseUrl == "REPLACE_WITH_YOUR_API_PREVIEW_URL") {
            binding.textView.text = "ERROR: You must set the apiBridgeBaseUrl in MainActivity.kt"
            return
        }

        val queue = Volley.newRequestQueue(this)
        val url = "$apiBridgeBaseUrl/run/$actionId"

        binding.textView.text = "Summoning: $actionId..."

        val stringRequest = StringRequest(
            Request.Method.GET, url,
            { response ->
                // Parse the JSON response and display the output
                val jsonObject = JSONObject(response)
                val output = jsonObject.getString("output")
                binding.textView.text = "Jin responds:

$output"
            },
            { error ->
                // Handle the error
                val errorMessage = error.networkResponse?.data?.let {
                    try {
                        val json = JSONObject(String(it))
                        json.getString("error")
                    } catch (e: Exception) {
                        error.message
                    }
                } ?: error.message
                binding.textView.text = "Error summoning Jin:

$errorMessage"
            })

        // Add the request to the RequestQueue.
        queue.add(stringRequest)
    }
}
