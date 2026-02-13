import axios from 'axios';
import fs from 'fs';
import FormData from 'form-data';

export class DeepAIService {
    private apiKey: string;
    private baseUrl: string = 'https://api.deepai.org/api';

    constructor() {
        this.apiKey = process.env.DEEPAI_API_KEY || '0a1e4f8d-ac80-48f2-b75f-8c73c2077f2b';
    }

    /**
     * AI Image Generator: Creates an image from scratch from a text description.
     */
    async text2img(text: string): Promise<string> {
        try {
            const response = await axios.post(`${this.baseUrl}/text2img`,
                new URLSearchParams({ text }).toString(),
                {
                    headers: { 'api-key': this.apiKey }
                }
            );
            return response.data.output_url;
        } catch (error) {
            console.error('DeepAI text2img error:', error);
            throw error;
        }
    }

    /**
     * Background Remover: Remove image background with AI.
     */
    async removeBackground(imageUrl: string): Promise<string> {
        try {
            const response = await axios.post(`${this.baseUrl}/background-remover`,
                new URLSearchParams({ image: imageUrl }).toString(),
                {
                    headers: { 'api-key': this.apiKey }
                }
            );
            return response.data.output_url;
        } catch (error) {
            console.error('DeepAI removeBackground error:', error);
            throw error;
        }
    }

    /**
     * AI Photo Editor: Edit photos and images with AI.
     */
    async editImage(imageUrl: string, text: string): Promise<string> {
        try {
            const response = await axios.post(`${this.baseUrl}/image-editor`,
                new URLSearchParams({ image: imageUrl, text }).toString(),
                {
                    headers: { 'api-key': this.apiKey }
                }
            );
            return response.data.output_url;
        } catch (error) {
            console.error('DeepAI editImage error:', error);
            throw error;
        }
    }

    /**
     * Image Colorizer: Add color to old family photos and historic images.
     */
    async colorizeImage(imageUrl: string): Promise<string> {
        try {
            const response = await axios.post(`${this.baseUrl}/colorizer`,
                new URLSearchParams({ image: imageUrl }).toString(),
                {
                    headers: { 'api-key': this.apiKey }
                }
            );
            return response.data.output_url;
        } catch (error) {
            console.error('DeepAI colorizeImage error:', error);
            throw error;
        }
    }

    /**
     * Super Resolution: Clarify, sharpen, and upscale photo without losing content.
     */
    async superResolution(imageUrl: string): Promise<string> {
        try {
            const response = await axios.post(`${this.baseUrl}/torch-srgan`,
                new URLSearchParams({ image: imageUrl }).toString(),
                {
                    headers: { 'api-key': this.apiKey }
                }
            );
            return response.data.output_url;
        } catch (error) {
            console.error('DeepAI superResolution error:', error);
            throw error;
        }
    }

    /**
     * Waifu2x: Upscale images while reducing noise.
     */
    async waifu2x(imageUrl: string): Promise<string> {
        try {
            const response = await axios.post(`${this.baseUrl}/waifu2x`,
                new URLSearchParams({ image: imageUrl }).toString(),
                {
                    headers: { 'api-key': this.apiKey }
                }
            );
            return response.data.output_url;
        } catch (error) {
            console.error('DeepAI waifu2x error:', error);
            throw error;
        }
    }

    /**
     * Creative Upscale.
     */
    async creativeUpscale(imageUrl: string): Promise<string> {
        try {
            const response = await axios.post(`${this.baseUrl}/creative-upscale`,
                new URLSearchParams({ image: imageUrl }).toString(),
                {
                    headers: { 'api-key': this.apiKey }
                }
            );
            return response.data.output_url;
        } catch (error) {
            console.error('DeepAI creativeUpscale error:', error);
            throw error;
        }
    }

    /**
     * Image Replace: Replace and edit objects in images with AI.
     */
    async replaceImage(imageUrl: string, maskUrl: string, text: string): Promise<string> {
        try {
            const response = await axios.post(`${this.baseUrl}/image-replace`,
                new URLSearchParams({ image: imageUrl, mask: maskUrl, text }).toString(),
                {
                    headers: { 'api-key': this.apiKey }
                }
            );
            return response.data.output_url;
        } catch (error) {
            console.error('DeepAI replaceImage error:', error);
            throw error;
        }
    }

    /**
     * Expand Image: Effortlessly expand images with AI Image Extender.
     */
    async expandImage(imageUrl: string): Promise<string> {
        try {
            const response = await axios.post(`${this.baseUrl}/zoom-out`,
                new URLSearchParams({ image: imageUrl }).toString(),
                {
                    headers: { 'api-key': this.apiKey }
                }
            );
            return response.data.output_url;
        } catch (error) {
            console.error('DeepAI expandImage error:', error);
            throw error;
        }
    }
}

export const deepAIService = new DeepAIService();
