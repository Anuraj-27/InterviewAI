package com.interview.platform.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StartInterviewRequest {

    @NotBlank(message = "Role is required (e.g., Software Engineer, Data Scientist, DevOps)")
    private String role;

    @NotBlank(message = "Level is required (e.g., Junior, Mid, Senior)")
    private String level;
}
