package io.amerhwitat.bizx;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import org.junit.jupiter.api.Test;

/** Runs the language-neutral contract vectors shared by BizX implementations. */
class UnifiedBizXRuntimeContractTest {
    private static final Path FIXTURES =
        Path.of("..", "contracts", "fixtures", "bizx-runtime-v1.tsv");

    @Test
    void matchesSharedRuntimeContractVectors() throws IOException {
        assertNotNull(Files.exists(FIXTURES) ? FIXTURES : null,
            "Shared runtime fixture file is missing: " + FIXTURES);
        UnifiedBizXRuntime runtime = new UnifiedBizXRuntime();
        List<String> lines = Files.readAllLines(FIXTURES, StandardCharsets.UTF_8);
        int vectors = 0;
        for (String line : lines) {
            if (line.isBlank() || line.startsWith("#")) continue;
            String[] fields = line.split("\\t", -1);
            assertEquals(3, fields.length, "Malformed fixture line: " + line);
            String input = fields[1];
            switch (fields[0]) {
                case "sha256" -> assertEquals(fields[2], runtime.sha256(input), "SHA-256 vector: " + input);
                case "startGame-null" -> assertEquals(fields[2], runtime.startGame(null).mode());
                case "startGame-blank" -> assertEquals(fields[2], runtime.startGame(input).mode());
                case "startGame-custom" -> assertEquals(fields[2], runtime.startGame(input).mode());
                case "features" -> assertEquals(List.of(fields[2].split(",", -1)), runtime.features());
                default -> throw new AssertionError("Unknown fixture case: " + fields[0]);
            }
            vectors++;
        }
        assertEquals(5, vectors, "Fixture count changed; update the expected acceptance count intentionally");
    }
}
