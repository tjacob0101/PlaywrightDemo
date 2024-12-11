Feature: Basic text to Image flow

  Scenario: User should see “Create Your Custom Scrambler Ducati” page
    Given I am on the Ducati Scrambler website
    When I click “Start to Create”
    Then I should see the “Create Your Custom Scrambler Ducati” page

  Scenario: User should be able to see 4 generated images
    Given I am on the image creation page
    When I fill in the prompt and click “Generate”
    And I wait for the generation process to complete
    Then I should see the 4 generated images

 Scenario: User checks resolution of a downloaded image
   Given the 4 images have been generated and are visible
   When I fill in my details and accept the terms
     | firstName | lastName | email            | country |
     | test      | test     | test@test.com    | Albania |
   And I click “Submit”
   Then I should be able to choose one of the 4 images
   And the resolution of the saved file should be 2056 x 1368




