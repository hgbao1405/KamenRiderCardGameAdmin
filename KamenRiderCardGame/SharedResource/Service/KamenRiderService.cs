using Microsoft.Extensions.Logging;
using SharedResource.Interface;
using SharedResource.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace SharedResource.Service
{
    public class KamenRiderService : IKamenRiderService
    {
        private readonly ILogger<KamenRiderService> _logger;
        private readonly HttpClient _httpClient;

        public KamenRiderService(ILogger<KamenRiderService> logger) { _logger = logger; }

        public async Task<Character> GetKamenRider(int id)
        {
            // Nếu chưa có, gọi API và lưu vào cache
            _logger.LogInformation("Fetching character with ID: {charId} from external API", id);
            try
            {
                // Ví dụ API URL
                var url = $"/api/characters/{id}";

                // Gọi API GET
                var response = await _httpClient.GetAsync(url);

                if (response.IsSuccessStatusCode)
                {
                    // Deserialize JSON response thành đối tượng Product
                    var JsonCharacter = await response.Content.ReadAsStringAsync();
                    var character = Newtonsoft.Json.JsonConvert.DeserializeObject<Character>(JsonCharacter);
                    return character;
                }
                else
                {
                    _logger.LogWarning("Failed to fetch character with ID: {charId}. Status Code: {StatusCode}", id, response.StatusCode);
                }
            }
            catch (HttpRequestException ex)
            {
                _logger.LogError(ex, "Error occurred while fetching character with ID: {charId}", id);
            }
            return null;
        }

        public async Task<string> GetKamenRiderName(int id)
        {
            // Nếu chưa có, gọi API và lưu vào cache
            _logger.LogInformation("Fetching character name with ID: {charId} from external API", id);
            try
            {
                // Ví dụ API URL
                var url = $"/api/characters/{id}";

                // Gọi API GET
                var response = await _httpClient.GetAsync(url);

                if (response.IsSuccessStatusCode)
                {
                    // Deserialize JSON response thành đối tượng Product
                    var JsonCharacter = await response.Content.ReadAsStringAsync();
                    var character = Newtonsoft.Json.JsonConvert.DeserializeObject<Character>(JsonCharacter);
                    return character.Name;
                }
                else
                {
                    _logger.LogWarning("Failed to fetch character name with ID: {charId}. Status Code: {StatusCode}", id, response.StatusCode);
                }
            }
            catch (HttpRequestException ex)
            {
                _logger.LogError(ex, "Error occurred while fetching character name with ID: {charId}", id);
            }
            return null;
        }
    }
}
